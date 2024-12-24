import express from 'express';
import Student from '../models/Students.js'; // تأكد من مسار النموذج الصحيح
import { body, validationResult } from 'express-validator'; // للتحقق من صحة البيانات

const router = express.Router();

// عرض قائمة الطلاب
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.render('students', { students });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// إضافة طالب
router.post('/students', 
  // التحقق من صحة البيانات
  body('FirstName').notEmpty().withMessage('First Name is required'),
  body('LastName').notEmpty().withMessage('Last Name is required'),
  body('PhoneNumber').isLength({ min: 10 }).withMessage('Phone Number must be at least 10 digits'),
  body('Email').isEmail().withMessage('Invalid email'),
  async (req, res) => {
    // التحقق من الأخطاء في البيانات
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('students', {
        errors: errors.array(),
        student: req.body, // احتفظ بالبيانات المدخلة لعرضها في النموذج
      });
    }

    try {
      const { FirstName, LastName, Street, Government, PhoneNumber, Email, Gender } = req.body;
      const student = await Student.create({ FirstName, LastName, Street, Government, PhoneNumber, Email, Gender });
      console.log(student);
      res.redirect('/');
    } catch (error) {
      res.status(500).render('students', { error: 'Error adding student' });
    }
  }
);

// عرض صفحة تعديل طالب
router.get('/students/edit/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.render('edit', { student });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
});

// تحديث بيانات الطالب
router.put('/students/:id', async (req, res) => {
  try {
    const { FirstName, LastName, Street, Government, PhoneNumber, Email, Gender } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }

    student.FirstName = FirstName || student.FirstName;
    student.LastName = LastName || student.LastName;
    student.Street = Street || student.Street;
    student.Government = Government || student.Government;
    student.PhoneNumber = PhoneNumber || student.PhoneNumber;
    student.Email = Email || student.Email;
    student.Gender = Gender || student.Gender;

    await student.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Error updating student' });
  }
});

// حذف طالب
router.delete('/students/delete/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    await student.destroy();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
});

export default router;
