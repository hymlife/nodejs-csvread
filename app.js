const fs = require("fs");
const csv = require("csv-parser");

const csvFilePath = "dosya.csv"; // CSV dosyasının yolu

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const domain = row["Alan Adı"];
    const bitisTarihi = row["Bitiş Tarihi"];

    if (domain && bitisTarihi) {
      const today = new Date(); // Şu anki tarih
      const endDate = new Date(bitisTarihi); // Bitiş tarihi

      // Kalan günleri hesapla
      const kalanGun = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

      // İstenilen çıktıyı konsola yazdır
      if (kalanGun > 0) {
        console.log(`${domain} - ${bitisTarihi} | Kalan Gün: ${kalanGun}`);
      } else if (kalanGun === 0) {
        console.log(`${domain} - ${bitisTarihi} | Bugün Son Gün!`);
      } else {
        console.log(`${domain} - ${bitisTarihi} | Süresi Doldu!`);
      }
    } else {
      console.log("Eksik veya hatalı veri satırı:", row);
    }
  })
  .on("end", () => {
    console.log("CSV dosyası okuma tamamlandı.");
  })
  .on("error", (error) => {
    console.error("Hata oluştu:", error.message);
  });
