Harika! `Bölüm 3: İlk Kodumuz, setup() & loop() Mantığı ve Derleme` başlığı altında, sitene doğrudan kopyalayıp yapıştırabileceğin, "yapay zeka kokmayan", akıcı ve son derece öğretici içeriği hazırladım.

---

# Bölüm 3: İlk Kodumuz, setup() & loop() Mantığı ve Derleme

Donanım dünyasının "Hello World" uygulamasıyla ve Arduino'nun kalbini oluşturan temel yapı taşlarıyla devam ediyoruz. Kartımızı bilgisayara bağlayıp ilk kodumuzu çalıştıracağız.

---

## 1. İlk Bağlantı ve Port Seçimi (COM Port)

Arduino'yu bilgisayara ilk kez bağladığında, bilgisayarın kartla haberleşebilmesi için doğru sürücünün (Driver) kurulu olması gerekir. Özellikle piyasadaki ekonomik/klon kartların çoğunda **CH340** veya **CP2102** USB-Seri dönüştürücü çipleri kullanılır.

* **Bağlantı Kontrolü:** Bilgisayarında *Aygıt Yöneticisi*'ni açarak **Bağlantı Noktaları (COM ve LPT)** sekmesinden kartının hangi porta (Örn: `COM3`, `COM12`) atandığını görebilirsin. Eğer burada sarı ünlem görüyorsan CH340 sürücüsünü kurman gerekebilir.
* **IDE Üzerinden Seçim:** Arduino IDE'yi açtıktan sonra üst menüden `Araçlar > Kart` kısmından modelini (örn. Arduino Uno), `Araçlar > Port` kısmından ise Aygıt Yöneticisi'nde gördüğün COM portunu seçmelisin.

---

## 2. İkonik İlk Uygulama: Blink (LED Yakıp Söndürme)

Yazılım dillerinde ekrana "Hello World" yazdırmak ne anlama geliyorsa, gömülü sistemlerde de bir LED'i yakıp söndürmek (`Blink`) aynı anlama gelir. Bu örnek, donanım ve yazılımın düzgün çalışıp çalışmadığını test etmenin en pratik yoludur.

IDE üzerinde **`Dosya > Örneklere > 01.Basics > Blink`** yolunu izleyerek hazır örneği açabilirsin. Kod üzerinde hiçbir değişiklik yapmadan sol üstteki **Yükle (Upload)** butonuna bastığında, kartın üzerindeki entegre LED'in (genellikle 13 numaralı pine bağlıdır) 1 saniye aralıklarla yanıp söndüğünü göreceksin.

---

## 3. Temel Yapı: `setup()` ve `loop()` Fonksiyonları

Her Arduino programı (Sketch), temel olarak iki ana fonksiyondan oluşur. Kodun iskeleti şu şekildedir:

```cpp
void setup() {
  // Kart ilk açıldığında veya resetlendiğinde SADECE BİR KEZ çalışır.
}

void loop() {
  // setup() bittikten sonra başlar ve kart enerjili olduğu sürece SONSUZA KADAR tekrarlanır.
}

```

### Fonksiyonların Detayları:

* **`setup()` Fonksiyonu:** Program çalışmaya başladığında bir defaya mahsus çalıştırılır. Burada pinlerin giriş mi çıkış mi olduğu (`pinMode`) belirlenir, seri haberleşme başlatılır (`Serial.begin`) veya başlangıç değişkenleri tanımlanır. İşi bittikten sonra bir daha çalışmaz.
* **`loop()` Fonksiyonu:** Adı üstünde bir döngüdür (`loop`). `setup()` bittikten sonra devreye girer; içerisindeki komutları sırasıyla baştan sona çalıştırır, en alta geldiğinde tekrar başa döner ve bu döngü kartın elektriği kesilene kadar sonsuza kadar sürer. Sensör okuma, motor kontrolü ve ekran güncelleme gibi sürekli yapılması gereken işler buraya yazılır.

---

## 4. Akış Diyagramı (Flowchart) Mantığı

Karmaşık projeler yazmadan önce kodun mantığını bir akış şemasında kurgulamak işini çok kolaylaştırır. `Blink` uygulamasının çalışma mantığı adım adım şu şekildedir:

1. **Başlangıç (Start):** Arduino enerji alır.
2. **Setup Aşaması:** 13 numaralı pin çıkış (`OUTPUT`) olarak ayarlanır (Sadece 1 kez yapılır).
3. **Loop Aşaması (Sonsuz Döngü):**
* LED'i aç (`HIGH`)
* 1000 milisaniye (1 saniye) bekle (`delay`)
* LED'i kapat (`LOW`)
* 1000 milisaniye (1 saniye) bekle (`delay`)
* *Başa dön ve tekrarla.*



---

## 5. İnsan Dilinden Makine Diline: Derleme (Compilation) Nedir?

Yazdığımız kodlar (`pinMode`, `digitalWrite`, `delay` vb.) İngilizce kelimelere dayanan, insan diline oldukça yakın yüksek seviyeli komutlardır. Ancak mikrodenetleyiciler bu metinleri doğrudan anlayamaz.

* **Derleyici (Compiler):** IDE içerisindeki derleyici, yazdığımız insan dostu kodları tarar, yazım hatası olup olmadığını kontrol eder ve bu kodları mikrodenetleyicinin anladığı saf **makine diline (0 ve 1'lerden oluşan ikili koda)** dönüştürür.
* IDE üzerindeki **"Kontrol Et" (✔)** butonuna bastığında kodun sadece derlenir (hatasız olup olmadığı denetlenir); **"Yükle" (➡)** butonuna bastığında ise önce derlenip ardından karta aktarılır.
