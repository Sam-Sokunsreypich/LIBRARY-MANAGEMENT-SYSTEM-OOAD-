"use client";
import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import SignOut from "@/app/admin/components/SignOut";
import { getUserLoggedInInfo } from "@/app/auth/actions";
import Image from "next/image";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserLoggedInInfo();
        setProfile(user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // empty dependency array so it runs only once

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <div className={styles.contentBox}>
        <div className={styles.topSection}>
          {/* Avatar upload */}
          <label className={styles.avatarWrapper}>
            {profile?.profile_image ? (
              <Image
                src={profile.profile_image}
                alt={profile.name || "Profile"}
                height={150}
                width={150}
              />
              
            ) : (
              <div className={styles.placeholderAvatar}>No Image</div>
            )}
          </label>
        </div>

        <hr className={styles.line} />

        <div className="bg-white p-2 rounded-xl border shadown-md">
          <h1>Name:  {profile.name}</h1>
          <h1>Email: {profile.email}</h1>
        </div>

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

        <div className="mt-5">
          <SignOut />
        </div>
      </div>
    </div>
  );
}
