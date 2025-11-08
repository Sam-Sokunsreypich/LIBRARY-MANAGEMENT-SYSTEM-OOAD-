"use client";
import { useState } from "react"; // ✅ you were missing this import
import styles from "./profile.module.css";
import Bar from "./bar";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState("/profile.png"); // default image

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <>
      <Bar /> {/* ✅ Top bar stays here */}

      <div className={styles.container}>
        <div className={styles.header}></div>

        <div className={styles.contentBox}>
          
          {/* ✅ Top section wrapper (this was missing) */}
          <div className={styles.topSection}>
            {/* Avatar upload */}
            <label className={styles.avatarWrapper}>
              <img src={profileImage} alt="Profile" className={styles.avatarImage} />
              <input type="file" accept="image/*" onChange={handleImageChange} className={styles.fileInput}/>
            </label>
          </div>

          <hr className={styles.line} />

          <div className={styles.largeBox}></div>

          <h3 className={styles.sectionTitle}>Account Setting</h3>

          <div className={styles.settingRow}>
            <span>Reset password</span>
            <button className={styles.resetBtn}>Reset</button>
          </div>

          <div className={styles.settingRow}>
            <span>Privacy Settings</span>
          </div>

          <div className={styles.settingRow}>
            <span>Notifications</span>
          </div>

          <div className={styles.settingRow}>
            <span>Reading Preferences</span>
            <button className={styles.resetBtn}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}
