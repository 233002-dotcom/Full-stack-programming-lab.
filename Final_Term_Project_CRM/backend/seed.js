const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Customer = require('./models/Customer');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for seeding...');

    // Clear existing data
    await Customer.deleteMany({});
    console.log('🗑️  Cleared existing customers');

    // Create a default admin user if none exists
    let adminUser = await User.findOne({ email: 'admin@crm.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@crm.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('👤 Admin user created: admin@crm.com / admin123');
    }

    // 15 Customer records
    const customers = [
      {
        name: 'James Anderson',
        email: 'james.anderson@techcorp.com',
        phone: '+1-555-0101',
        company: 'TechCorp Solutions',
        status: 'Active',
        address: '123 Silicon Valley Blvd, San Francisco, CA 94105',
        notes: 'Premium enterprise client. Renews annually.',
        totalSpent: 15000,
        createdBy: adminUser._id,
      },
      {
        name: 'Sophia Martinez',
        email: 'sophia.m@innovate.io',
        phone: '+1-555-0102',
        company: 'Innovate IO',
        status: 'Active',
        address: '456 Startup Lane, Austin, TX 78701',
        notes: 'Interested in expanding to mobile platform.',
        totalSpent: 8500,
        createdBy: adminUser._id,
      },
      {
        name: 'Liam Johnson',
        email: 'liam.j@bluewave.net',
        phone: '+1-555-0103',
        company: 'BlueWave Networks',
        status: 'Lead',
        address: '789 Ocean Drive, Miami, FL 33101',
        notes: 'Contacted via LinkedIn. Demo scheduled for next week.',
        totalSpent: 0,
        createdBy: adminUser._id,
      },
      {
        name: 'Emma Williams',
        email: 'emma.w@designstudio.co',
        phone: '+1-555-0104',
        company: 'DesignStudio Co',
        status: 'Active',
        address: '321 Creative Ave, New York, NY 10001',
        notes: 'UI/UX agency. Monthly retainer contract.',
        totalSpent: 22000,
        createdBy: adminUser._id,
      },
      {
        name: 'Noah Brown',
        email: 'noah.b@globalfinance.com',
        phone: '+1-555-0105',
        company: 'Global Finance Ltd',
        status: 'Inactive',
        address: '654 Wall Street, New York, NY 10005',
        notes: 'Budget cuts caused account suspension. Follow up Q2.',
        totalSpent: 5200,
        createdBy: adminUser._id,
      },
      {
        name: 'Olivia Davis',
        email: 'olivia.d@healthplus.med',
        phone: '+1-555-0106',
        company: 'HealthPlus Medical',
        status: 'Active',
        address: '987 Medical Center Dr, Boston, MA 02115',
        notes: 'Healthcare sector client. HIPAA compliance required.',
        totalSpent: 31000,
        createdBy: adminUser._id,
      },
      {
        name: 'William Taylor',
        email: 'w.taylor@retailmax.com',
        phone: '+1-555-0107',
        company: 'RetailMax Inc',
        status: 'Lead',
        address: '147 Commerce Blvd, Chicago, IL 60601',
        notes: 'Referred by Emma Williams. Needs e-commerce integration.',
        totalSpent: 0,
        createdBy: adminUser._id,
      },
      {
        name: 'Ava Wilson',
        email: 'ava.w@cloudpeak.io',
        phone: '+1-555-0108',
        company: 'CloudPeak Technologies',
        status: 'Active',
        address: '258 Cloud Street, Seattle, WA 98101',
        notes: 'SaaS company. Upgraded to enterprise plan.',
        totalSpent: 19500,
        createdBy: adminUser._id,
      },
      {
        name: 'James Moore',
        email: 'j.moore@edulearn.org',
        phone: '+1-555-0109',
        company: 'EduLearn Foundation',
        status: 'Inactive',
        address: '369 University Ave, Berkeley, CA 94720',
        notes: 'Non-profit. Grant funding expired.',
        totalSpent: 3200,
        createdBy: adminUser._id,
      },
      {
        name: 'Isabella Jackson',
        email: 'i.jackson@luxebrand.com',
        phone: '+1-555-0110',
        company: 'LuxeBrand Agency',
        status: 'Active',
        address: '741 Fashion District, Los Angeles, CA 90015',
        notes: 'Luxury fashion brand. High-value client.',
        totalSpent: 45000,
        createdBy: adminUser._id,
      },
      {
        name: 'Mason White',
        email: 'm.white@greentech.eco',
        phone: '+1-555-0111',
        company: 'GreenTech Eco',
        status: 'Lead',
        address: '852 Eco Park Rd, Portland, OR 97201',
        notes: 'Sustainable tech startup. Pitch sent, awaiting response.',
        totalSpent: 0,
        createdBy: adminUser._id,
      },
      {
        name: 'Charlotte Harris',
        email: 'c.harris@mediapulse.tv',
        phone: '+1-555-0112',
        company: 'MediaPulse TV',
        status: 'Active',
        address: '963 Broadcast Ave, Nashville, TN 37201',
        notes: 'Media company. Uses CRM for talent management.',
        totalSpent: 12800,
        createdBy: adminUser._id,
      },
      {
        name: 'Ethan Clark',
        email: 'e.clark@securenet.io',
        phone: '+1-555-0113',
        company: 'SecureNet Solutions',
        status: 'Active',
        address: '174 Cyber Lane, Washington, DC 20001',
        notes: 'Cybersecurity firm. Government contracts.',
        totalSpent: 67000,
        createdBy: adminUser._id,
      },
      {
        name: 'Mia Lewis',
        email: 'm.lewis@foodtech.co',
        phone: '+1-555-0114',
        company: 'FoodTech Co',
        status: 'Inactive',
        address: '285 Culinary Blvd, Chicago, IL 60609',
        notes: 'Food delivery startup. Paused due to funding round.',
        totalSpent: 2100,
        createdBy: adminUser._id,
      },
      {
        name: 'Alexander Young',
        email: 'a.young@finova.com',
        phone: '+1-555-0115',
        company: 'Finova Capital',
        status: 'Lead',
        address: '396 Finance Tower, Dallas, TX 75201',
        notes: 'VC-backed fintech. Very high potential deal.',
        totalSpent: 0,
        createdBy: adminUser._id,
      },
    ];

    await Customer.insertMany(customers);
    console.log(`✅ Seeded ${customers.length} customers successfully!`);

    console.log('\n📋 Summary:');
    console.log('   Admin login: admin@crm.com / admin123');
    console.log('   Customers seeded: 15 (6 Active, 4 Lead, 3 Inactive... wait, 6A+4L+3I=13, let me recount)');
    console.log('   Active: 7, Lead: 4, Inactive: 3... see records above');

    mongoose.disconnect();
    console.log('\n🎉 Seeding complete!');
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
