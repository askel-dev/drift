
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenTool, Palette, Brain, Heart } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Palette,
      title: "Mood-Based Writing",
      description: "Experience writing in atmospheric color palettes that reflect your emotional state and inspire creativity."
    },
    {
      icon: Brain,
      title: "Distraction-Free",
      description: "Clean, minimal interface that fades away, leaving you alone with your thoughts and words."
    },
    {
      icon: Heart,
      title: "Emotional Organization",
      description: "Find your notes by feeling rather than keywords. Organize thoughts by the mood you were in when you wrote them."
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Floating Organic Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/8436588b-0862-4bbf-b5ef-991b44803f6a.png" 
              alt="Drift Logo" 
              className="w-8 h-8"
            />
            <span className="text-2xl font-light text-gray-800">Drift</span>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app')}
            className="text-gray-700 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm"
          >
            Open App
          </Button>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Logo Section - Left */}
              <div className="flex justify-center lg:justify-start">
                <img 
                  src="/lovable-uploads/8436588b-0862-4bbf-b5ef-991b44803f6a.png" 
                  alt="Drift Logo" 
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              
              {/* Content Section - Right */}
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6 leading-tight">
                  Write with
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    your emotions
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed">
                  A minimalistic note-taking experience that adapts to your mood, 
                  creating an atmospheric space where thoughts flow naturally.
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex lg:justify-start justify-center">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/app')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Writing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-white/50 backdrop-blur-sm px-8 py-4 text-lg font-light rounded-2xl"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 text-center mb-16">
              Writing, reimagined
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-8 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-8 text-center">
          <p className="text-gray-500 font-light">
            Made with ❤️ for thoughtful writers
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
