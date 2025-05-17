import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaWater, 
  FaChartLine, 
  FaRobot, 
  FaLeaf, 
  FaSun, 
  FaCloud, 
  FaTemperatureHigh, 
  FaTint,
  FaSeedling,
  FaTree,
  FaCloudRain,
  FaWind,
  FaRegClock,
  FaRegCalendarAlt,
  FaRegLightbulb
} from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen font-['Poppins']">
      {/* Hero Section with Enhanced Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50">
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated blobs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-emerald-100 rounded-full opacity-30 animate-pulse">
              <FaTree className="w-20 h-20 text-emerald-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-lime-100 rounded-full opacity-30 animate-pulse animation-delay-1000">
              <FaSeedling className="w-24 h-24 text-lime-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-green-100 rounded-full opacity-30 animate-pulse animation-delay-2000">
              <FaCloudRain className="w-16 h-16 text-green-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 mt-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-emerald-800 mb-6 tracking-tight">
                ብልህ መስኖ
                <div className="text-4xl md:text-5xl font-normal mt-4 text-emerald-600">
                  Roobaa Garaa
                </div>
              </h1>
              <p className="text-2xl md:text-3xl text-emerald-700 max-w-4xl mx-auto leading-relaxed font-light">
                ትክክለኛነት በመጠቀም ግብርናን ይለውጡ። ውሃን ይቆጥቡ፣ የሰብል ምርትን ያሳድጉ፣ እና ዘላቂነትን በቀላሉ ያዳብሩ።
                <div className="text-xl md:text-2xl mt-4 text-emerald-600 font-light">
                  Qonnaan sirrii ta'e fayyadamaa. Bishaan eegaa, qonna guddisaa, fi haala tasuma malee tolfama.
                </div>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-6 justify-center mb-20"
            >
              <Link 
                to="/dashboard" 
                className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <FaRegLightbulb className="w-6 h-6" />
                  ዳሽቦርድን ያስሱ
                  <div className="text-base font-normal text-emerald-100">
                    Daashboordii Qoradhu
                  </div>
                </span>
              </Link>
              <Link 
                to="/about" 
                className="group relative px-10 py-5 bg-white text-emerald-600 rounded-2xl font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-emerald-200 text-lg"
              >
                <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <FaRegCalendarAlt className="w-6 h-6" />
                  ተጨማሪ ይወቁ
                  <div className="text-base font-normal text-emerald-500">
                    Dabalata Baradhu
                  </div>
                </span>
              </Link>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8"
            >
              {[
                { 
                  icon: <FaWater className="w-10 h-10 text-blue-500" />, 
                  value: "30%", 
                  label: "ውሃ ተቆጥቧል", 
                  sublabel: "Bishaan Eegame",
                  bgColor: "bg-blue-50",
                  textColor: "text-blue-700"
                },
                { 
                  icon: <FaChartLine className="w-10 h-10 text-emerald-500" />, 
                  value: "99.9%", 
                  label: "የስርዓት እንቅስቃሴ", 
                  sublabel: "Sistimiin Yeroo Hojii",
                  bgColor: "bg-emerald-50",
                  textColor: "text-emerald-700"
                },
                { 
                  icon: <FaLeaf className="w-10 h-10 text-green-500" />, 
                  value: "25%", 
                  label: "የምርት መጨመር", 
                  sublabel: "Guddina Qonna",
                  bgColor: "bg-green-50",
                  textColor: "text-green-700"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`${feature.bgColor} backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-${feature.textColor.split('-')[1]}-100 hover:shadow-2xl transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-4 bg-white rounded-full shadow-lg">
                      {feature.icon}
                    </div>
                    <p className={`text-3xl font-bold ${feature.textColor} mb-2`}>{feature.value}</p>
                    <p className="text-lg font-medium text-gray-700">{feature.label}</p>
                    <p className="text-sm text-gray-500 mt-1">{feature.sublabel}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-24 bg-gradient-to-b from-emerald-50 to-lime-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-emerald-800 mb-6">
              ባህሪያት
              <div className="text-3xl font-normal text-emerald-600 mt-3">
                Amaloota
              </div>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaSun className="w-14 h-14 text-yellow-500" />,
                title: "ብልህ መስኖ",
                subtitle: "Roobaa Garaa",
                description: "ትክክለኛ የውሃ አጠቃቀም ስርዓት።",
                descriptionOm: "Sirna fayyadama bishaan sirrii ta'e.",
                bgColor: "bg-yellow-50",
                textColor: "text-yellow-700"
              },
              {
                icon: <FaCloud className="w-14 h-14 text-blue-500" />,
                title: "የአየር ሁኔታ ትንታኔ",
                subtitle: "Qilleensa Qorannoo",
                description: "የአየር ሁኔታን በተግባባት የሚተነትን ስርዓት።",
                descriptionOm: "Sirna qilleensa yeroo yeroo qorataa fi sirreessa.",
                bgColor: "bg-blue-50",
                textColor: "text-blue-700"
              },
              {
                icon: <FaTemperatureHigh className="w-14 h-14 text-red-500" />,
                title: "የሙቀት ቁጥጥር",
                subtitle: "Ho'a To'achuu",
                description: "የአፈር ሙቀትን እና እርጥበትን የሚቆጣጠር ስርዓት።",
                descriptionOm: "Sirna ho'a fi qaroo lafaa to'ataa.",
                bgColor: "bg-red-50",
                textColor: "text-red-700"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`${feature.bgColor} backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-${feature.textColor.split('-')[1]}-100 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="mb-8 p-6 bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg mx-auto">
                  {feature.icon}
                </div>
                <h3 className={`text-3xl font-bold ${feature.textColor} mb-4`}>
                  {feature.title}
                  <div className="text-xl font-normal text-gray-600 mt-2">
                    {feature.subtitle}
                  </div>
                </h3>
                <p className="text-lg text-gray-700 mb-3">{feature.description}</p>
                <p className="text-base text-gray-500">{feature.descriptionOm}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-b from-lime-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold text-emerald-800 mb-8">
              አሁን ይጀምሩ
              <div className="text-3xl font-normal text-emerald-600 mt-3">
                Amma Jalqabaa
              </div>
            </h2>
            <p className="text-2xl text-emerald-700 mb-12 leading-relaxed">
              ብልህ መስኖ ስርዓታችንን በመጠቀም የእርሻዎን አፈጻጸም ያሳድጉ።
              <div className="text-xl text-emerald-600 mt-4">
                Sirna roobaa garaa fayyadamaa fi qonna keessan guddisaa.
              </div>
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-xl"
            >
              <FaRegClock className="w-6 h-6" />
              ዳሽቦርድን ያስሱ
              <div className="text-base font-normal text-emerald-100">
                Daashboordii Qoradhu
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;