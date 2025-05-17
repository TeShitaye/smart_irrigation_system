import { motion } from 'framer-motion';
import { FaWater, FaLeaf, FaRobot, FaChartLine, FaUsers, FaLightbulb } from 'react-icons/fa';

function About() {
  const features = [
    {
      icon: <FaWater className="w-8 h-8 text-blue-500" />,
      title: 'ብልህ የውሃ አጠቃቀም',
      subtitle: 'Bishaan Fayyadama Garaa',
      description: 'የአፈር እርጥበት ቁጥጥር እና የውሃ አጠቃቀምን ያሳምራል።',
      descriptionOm: 'Qaroo lafaa fi fayyadama bishaan sirreessa.',
    },
    {
      icon: <FaLeaf className="w-8 h-8 text-green-500" />,
      title: 'የሰብል እድገት ቁጥጥር',
      subtitle: 'Guddina Qonna To\'achuu',
      description: 'የሰብል እድገትን በተስማሚ ሁኔታ ያስተካክላል።',
      descriptionOm: 'Guddina qonna haala gaarii irratti sirreessa.',
    },
    {
      icon: <FaRobot className="w-8 h-8 text-purple-500" />,
      title: 'ኤአይ ምክሮች',
      subtitle: 'AI Taltii',
      description: 'በኤአይ በመጠቀም የተገኘ የሰብል እና የስርዓት ምክሮች።',
      descriptionOm: 'AI fayyadamuun qonna fi sirna irratti hundaa\'e taltii.',
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-yellow-500" />,
      title: 'የውሂብ ትንታኔ',
      subtitle: 'Qubeewwan Hubannoo',
      description: 'የሰብል እና የአየር ሁኔታ ውሂብን ያንተናል።',
      descriptionOm: 'Qonna fi haala qilleensa irratti hubannoo qabeessa.',
    },
  ];

  const team = [
    {
      name: 'የምርምር ቡድን',
      nameOm: 'Garee Qorannoo',
      role: 'ብልህ መስኖ ስርዓት',
      roleOm: 'Sirna Roobaa Garaa',
      description: 'የምርምር ቡድናችን ብልህ መስኖ ስርዓትን ለማሳደግ ይሰራል።',
      descriptionOm: 'Gareen keenya sirna roobaa garaa guddisuu hojjeta.',
    },
    {
      name: 'የሰብል ባለሙያዎች',
      nameOm: 'Ogbaroota Qonna',
      role: 'የሰብል እድገት ቁጥጥር',
      roleOm: 'Guddina Qonna To\'achuu',
      description: 'የሰብል ባለሙያዎቻችን የሰብል እድገትን ያስተካክላሉ።',
      descriptionOm: 'Ogbaroon keenya guddina qonna sirreessu.',
    },
    {
      name: 'የቴክኖሎጂ ቡድን',
      nameOm: 'Garee Teknooloojii',
      role: 'የስርዓት ማስተካከያ',
      roleOm: 'Sirna Sirreessuu',
      description: 'የቴክኖሎጂ ቡድናችን ስርዓቱን ያስተካክላል።',
      descriptionOm: 'Gareen teknooloojii sirna sirreessa.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ስለ እኛ
            <div className="text-2xl font-normal text-gray-600 mt-1">
              Waa\'ee Keenya
            </div>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            ብልህ መስኖ ስርዓት የሰብል ምርትን ለማሳሳብ የተነደፈ ነው።
            <div className="text-sm text-gray-500 mt-1">
              Sirna roobaa garaa qonna baasuu fi guddisuu irratti hunda\'e.
            </div>
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{feature.subtitle}</p>
              <p className="text-gray-600">{feature.description}</p>
              <p className="text-sm text-gray-500 mt-1">{feature.descriptionOm}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <FaLightbulb className="w-8 h-8 text-yellow-500 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                ተልእኮና ራዕይ
                <div className="text-lg font-normal text-gray-600 mt-1">
                  Ajajaa fi Imaammata
                </div>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ተልእኮ</h3>
              <p className="text-gray-600">
                የሰብል ምርትን ለማሳሳብ ብልህ መስኖ ስርዓትን እናበረታታለን።
                <div className="text-sm text-gray-500 mt-1">
                  Qonna baasuu fi guddisuu irratti sirna roobaa garaa dhiyeessuu.
                </div>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ራዕይ</h3>
              <p className="text-gray-600">
                በኢትዮጵያ ውስጥ የሰብል ምርትን ለማሳሳብ ብልህ መስኖ ስርዓትን እናበረታታለን።
                <div className="text-sm text-gray-500 mt-1">
                  Itoophiyaa keessatti qonna baasuu fi guddisuu irratti sirna roobaa garaa dhiyeessuu.
                </div>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center mb-8">
            <FaUsers className="w-8 h-8 text-blue-500 mr-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              የቡድናችን አባላት
              <div className="text-lg font-normal text-gray-600 mt-1">
                Dargaggoon Garee Keenya
              </div>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{member.nameOm}</p>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-blue-500 mb-3">{member.roleOm}</p>
                <p className="text-gray-600">{member.description}</p>
                <p className="text-sm text-gray-500 mt-1">{member.descriptionOm}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ያግኙን
            <div className="text-lg font-normal text-gray-600 mt-1">
              Nu Quunnamaa
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                አዲስ አበባ ዩኒቨርሲቲ፣ አዲስ አበባ፣ ኢትዮጵያ
                <div className="text-sm text-gray-500 mt-1">
                  Yuunivarsiitii Finfinnee, Finfinnee, Itoophiyaa
                </div>
              </p>
              <p className="text-gray-600">
                በስልክ: +251 912 345 678
                <div className="text-sm text-gray-500 mt-1">
                  Bilbilaa: +251 912 345 678
                </div>
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                በኢሜይል: info@smartirrigation.et
                <div className="text-sm text-gray-500 mt-1">
                  Imeelii: info@smartirrigation.et
                </div>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;