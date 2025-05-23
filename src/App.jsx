import { useState, useContext } from "react";
import ThemeSwitch from "./Components/ThemeSwitch";
import { ThemeContext } from "./Context/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  const [tugasBaru, setTugasBaru] = useState("");
  const [daftarTugas, setDaftarTugas] = useState([]);

  const handleInputChange = (event) => {
    setTugasBaru(event.target.value);
  };

  const handleTambahTugas = () => {
    if (tugasBaru.trim() !== "") {
      setDaftarTugas([...daftarTugas, { text: tugasBaru, completed: false, id: Date.now() }]);
      setTugasBaru("");
    }
  };

  const handleHapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter(tugas => tugas.id !== id));
  };

  const handleToggleComplete = (id) => {
    setDaftarTugas(daftarTugas.map(tugas => 
      tugas.id === id ? { ...tugas, completed: !tugas.completed } : tugas
    ));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTambahTugas();
    }
  };

  return (
    <div className={`
      min-h-screen transition-all duration-700 ease-in-out
      ${theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }
      px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20
    `}>
      
      {/* Background Elemen*/}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`
          absolute top-10 left-10 w-32 h-32 rounded-full opacity-10
          ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-400'}
          animate-pulse
        `}></div>
        <div className={`
          absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-5
          ${theme === 'dark' ? 'bg-blue-500' : 'bg-slate-300'}
          animate-pulse delay-1000
        `}></div>
        <div className={`
          absolute top-1/2 left-1/4 w-16 h-16 rounded-full opacity-8
          ${theme === 'dark' ? 'bg-teal-500' : 'bg-gray-400'}
          animate-pulse delay-2000
        `}></div>
      </div>

      <main className="relative max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        
        <header className="text-center mb-8 sm:mb-10 md:mb-12">
          <nav className="relative inline-block">
            <h1 className={`
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3
              transition-colors duration-500
              ${theme === 'dark' 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800'
              }
            `}>
              To-Do List
            </h1>
            
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className={`
                w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse
                ${theme === 'dark' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-slate-500 shadow-lg shadow-slate-500/30'}
              `}></div>
              <div className={`
                w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse delay-500
                ${theme === 'dark' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-slate-500 shadow-lg shadow-slate-500/30'}
              `}></div>
            </div>
          </nav>
          
          <p className={`
            text-sm sm:text-base md:text-lg opacity-80
            ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}
          `}>
            Mari lebih disiplin pada tugas kamu !
          </p>
        </header>

        <section className={`
          backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10
          transition-all duration-500 ease-in-out
          ${theme === 'dark' 
            ? 'bg-slate-800/70 border border-slate-700/50 shadow-2xl shadow-emerald-500/10' 
            : 'bg-white/80 border border-gray-200/50 shadow-2xl shadow-slate-500/10'
          }
          hover:shadow-3xl transform hover:scale-[1.02]
        `}>
          
          <section className="mb-8">
            <div className="relative">
              <input
                type="text"
                className={`
                  w-full px-4 py-4 sm:px-5 sm:py-5 rounded-2xl
                  transition-all duration-300 ease-in-out
                  ${theme === 'dark' 
                    ? 'bg-slate-700/50 border-2 border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-500 focus:bg-slate-700/70' 
                    : 'bg-gray-50/70 border-2 border-gray-300/50 text-slate-800 placeholder-slate-500 focus:border-slate-500 focus:bg-white/90'
                  }
                  focus:outline-none focus:ring-4
                  ${theme === 'dark' ? 'focus:ring-emerald-500/20' : 'focus:ring-slate-500/20'}
                  text-sm sm:text-base md:text-lg
                `}
                value={tugasBaru}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Tambahkan tugas baru..."
              />
              
              <button
                onClick={handleTambahTugas}
                disabled={!tugasBaru.trim()}
                className={`
                  absolute right-2 top-1/2 transform -translate-y-1/2
                  px-4 py-2 sm:px-6 sm:py-3 rounded-xl
                  transition-all duration-300 ease-in-out
                  ${tugasBaru.trim() 
                    ? (theme === 'dark' 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white' 
                        : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white'
                      )
                    : 'bg-gray-400/50 text-gray-500 cursor-not-allowed'
                  }
                  transform hover:scale-105 active:scale-95
                  text-sm sm:text-base font-medium
                `}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </section>

          {/* Tasks List */}
          <article className="space-y-3 sm:space-y-4">
            {daftarTugas.length === 0 ? (
              <div className={`
                text-center py-12 sm:py-16
                ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}
              `}>
                <div className={`
                  w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full opacity-30
                  ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-400'}
                  animate-pulse
                `}></div>
                <p className="text-sm sm:text-base md:text-lg">
                  Belum ada tugas. Ayo list tugasmu !
                </p>
              </div>
            ) : (
              daftarTugas.map((tugas, index) => (
                <div
                  key={tugas.id}
                  className={`
                    group relative p-4 sm:p-5 rounded-2xl
                    transition-all duration-300 ease-in-out
                    ${theme === 'dark' 
                      ? 'bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30' 
                      : 'bg-gray-50/50 hover:bg-white/70 border border-gray-200/50'
                    }
                    hover:shadow-lg transform hover:scale-[1.02]
                    ${tugas.completed ? 'opacity-60' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideIn 0.5s ease-out forwards'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                      <button
                        onClick={() => handleToggleComplete(tugas.id)}
                        className={`
                          w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center
                          transition-all duration-300 ease-in-out
                          ${tugas.completed 
                            ? (theme === 'dark' ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-500 border-slate-500')
                            : (theme === 'dark' ? 'border-emerald-500 hover:bg-emerald-500/20' : 'border-slate-400 hover:bg-slate-500/20')
                          }
                        `}
                      >
                        {tugas.completed && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      <span className={`
                        text-sm sm:text-base md:text-lg flex-1
                        ${tugas.completed ? 'line-through' : ''}
                        ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}
                        transition-colors duration-300
                      `}>
                        {tugas.text}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleHapusTugas(tugas.id)}
                      className={`
                        ml-3 p-2 rounded-xl opacity-0 group-hover:opacity-100
                        transition-all duration-300 ease-in-out
                        ${theme === 'dark' 
                          ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300' 
                          : 'text-red-500 hover:bg-red-500/10 hover:text-red-600'
                        }
                        transform hover:scale-110 active:scale-95
                      `}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </article>

          {/* statistik tugas yang selesai */}
          {daftarTugas.length > 0 && (
            <div className={`
              mt-8 pt-6 border-t
              ${theme === 'dark' ? 'border-slate-600/30' : 'border-gray-200/50'}
            `}>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className={`
                  ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}
                `}>
                  Total: {daftarTugas.length} misi
                </span>
                <span className={`
                  px-3 py-1 rounded-full text-xs sm:text-sm
                  ${theme === 'dark' 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : 'bg-slate-500/20 text-slate-600'
                  }
                `}>
                  Selesai: {daftarTugas.filter(t => t.completed).length}
                </span>
              </div>
            </div>
          )}
        </section>
      </main>

      <ThemeSwitch />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;