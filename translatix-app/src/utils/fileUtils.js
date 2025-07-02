// Định dạng kích thước file
export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// Lấy danh sách file gần đây từ localStorage
export function getRecentFiles(platform) {
  const key = `translatix-recentFiles-${platform}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// Thêm một file vào danh sách gần đây
export function addRecentFile(file, platform) {
  let recentFiles = getRecentFiles(platform);
  const newFileEntry = {
    name: file.name,
    size: file.size,
    lastModified: file.lastModified,
  };
  // Xóa file cũ nếu có trùng tên để đưa file mới lên đầu
  recentFiles = recentFiles.filter((f) => f.name !== newFileEntry.name);
  recentFiles.unshift(newFileEntry);
  // Giới hạn chỉ lưu 3 file gần nhất
  const limitedFiles = recentFiles.slice(0, 3);
  const key = `translatix-recentFiles-${platform}`;
  localStorage.setItem(key, JSON.stringify(limitedFiles));
}

// Hàm khởi tạo dữ liệu giả cho lần chạy đầu tiên
export function setupInitialRecentFiles() {
  const platforms = ["rpg", "unity", "unreal", "comic"];
  const fakeFilesData = {
    rpg: [
      { name: "FinalFantasy-VII.exe", size: 15728640 },
      { name: "ChronoTrigger-data.pak", size: 5242880 },
    ],
    unity: [{ name: "HollowKnight_Data/Assembly-CSharp.dll", size: 2097152 }],
    unreal: [
      {
        name: "StreetFighter6/Content/Paks/pakchunk0-Windows.pak",
        size: 943718400,
      },
    ],
    comic: [
      { name: "One-Piece-Chap-1000.zip", size: 26214400 },
      { name: "Jujutsu-Kaisen-Vol-5.cbz", size: 89128960 },
    ],
  };

  platforms.forEach((platform) => {
    const key = `translatix-recentFiles-${platform}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(fakeFilesData[platform]));
    }
  });
}
