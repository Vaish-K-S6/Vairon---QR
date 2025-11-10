import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Link2, Type, Palette, Sparkles, Zap, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function QRCodeGenerator() {
  const [value, setValue] = useState("https://figma.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [downloaded, setDownloaded] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = url;
      link.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    }
  };

  const colorPresets = [
    { fg: "#000000", bg: "#ffffff", name: "Classic" },
    { fg: "#1e40af", bg: "#dbeafe", name: "Ocean" },
    { fg: "#7c3aed", bg: "#f3e8ff", name: "Purple" },
    { fg: "#dc2626", bg: "#fee2e2", name: "Ruby" },
    { fg: "#059669", bg: "#d1fae5", name: "Mint" },
    { fg: "#ea580c", bg: "#ffedd5", name: "Sunset" },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-6"
        >
          <div className="relative inline-block">
            <Sparkles className="w-16 h-16 text-yellow-300 drop-shadow-lg" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full blur-sm"
            />
          </div>
        </motion.div>
        <h1 className="mb-4 text-white drop-shadow-lg">
          QR Code Generator
        </h1>
        <p className="text-white/90 max-w-2xl mx-auto text-lg">
          Create stunning custom QR codes in seconds. Free, fast, and beautifully designed.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">
        {/* Left Column - Input and Settings */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Customize Your QR Code
              </CardTitle>
              <CardDescription>Enter your content and adjust the settings below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">
                    <Link2 className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="text">
                    <Type className="w-4 h-4 mr-2" />
                    Text
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url-input">Website URL</Label>
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="border-2 focus-visible:border-purple-500"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Text Content</Label>
                    <Input
                      id="text-input"
                      type="text"
                      placeholder="Enter any text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="border-2 focus-visible:border-purple-500"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-4 h-4 text-purple-600" />
                  <span>Appearance</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size-slider">Size: {size}px</Label>
                  <Slider
                    id="size-slider"
                    min={128}
                    max={512}
                    step={32}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Color Presets</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <motion.button
                        key={preset.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFgColor(preset.fg);
                          setBgColor(preset.bg);
                        }}
                        className="relative h-14 rounded-lg border-2 border-gray-200 hover:border-purple-500 transition-colors overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${preset.bg} 0%, ${preset.bg} 50%, ${preset.fg} 50%, ${preset.fg} 100%)`
                        }}
                      >
                        <span className="absolute bottom-1 left-0 right-0 text-center text-xs bg-white/90 py-0.5">
                          {preset.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fg-color">Foreground</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fg-color"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Background</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - QR Code Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur sticky top-8">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Your generated QR code</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <motion.div
                key={`${value}-${size}-${fgColor}-${bgColor}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                ref={qrRef}
                className="p-8 bg-white rounded-xl shadow-lg border-4 border-gradient"
                style={{ 
                  backgroundColor: bgColor,
                  borderImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1"
                }}
              >
                {value ? (
                  <QRCodeCanvas
                    value={value}
                    size={size}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                    includeMargin={false}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center text-muted-foreground"
                    style={{ width: size, height: size }}
                  >
                    Enter content to generate
                  </div>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  onClick={downloadQRCode}
                  disabled={!value}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                >
                  {downloaded ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download QR Code
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Features Grid with Images */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur h-full">
            <div className="h-48 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1685575112968-7dd67bc447b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjBzY2FuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI3ODc5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="QR Code Technology"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center mb-4 shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Generate QR codes instantly with real-time preview. No waiting, no hassle.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur h-full">
            <div className="h-48 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1705544363579-2116d47ddceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHNjYW5uaW5nfGVufDF8fHx8MTc2Mjc4MDUwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Mobile Scanning"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mb-4 shadow-lg">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Fully Customizable</h3>
              <p className="text-muted-foreground">
                Choose from color presets or create your own unique design with custom colors.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur h-full">
            <div className="h-48 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1639493115941-a70fcef4f715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2Mjc4Nzk1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="High Quality"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center mb-4 shadow-lg">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="mb-2">High Quality Export</h3>
              <p className="text-muted-foreground">
                Download your QR codes in high resolution PNG format, ready for print or digital use.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* How to Use Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">How It Works</CardTitle>
            <CardDescription>Create your QR code in three simple steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center space-y-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">1</span>
                </motion.div>
                <h3>Enter Your Content</h3>
                <p className="text-muted-foreground">
                  Type or paste your URL, text, or any data you want to encode into a QR code.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center space-y-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">2</span>
                </motion.div>
                <h3>Customize Design</h3>
                <p className="text-muted-foreground">
                  Choose from beautiful color presets or create your own custom color scheme.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="text-center space-y-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                  className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">3</span>
                </motion.div>
                <h3>Download & Share</h3>
                <p className="text-muted-foreground">
                  Click the download button to save your QR code as a high-quality PNG image.
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
