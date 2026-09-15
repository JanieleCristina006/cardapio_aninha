import { LogOut, ShoppingBag, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  business,
  defaultProfile,
  PROFILE_STORAGE_KEY,
} from "../../data/catalog";
import { clearAuthSession } from "../../services/api";

function readProfile() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    return storedProfile ? JSON.parse(storedProfile) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(readProfile);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleProfileUpdate() {
      setProfile(readProfile());
    }

    window.addEventListener("profile-updated", handleProfileUpdate);
    window.addEventListener("storage", handleProfileUpdate);

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
      window.removeEventListener("storage", handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    clearAuthSession();
    setOpenDropdown(false);
    navigate("/login");
  }

  return (
    <header className="w-full border-b border-neutral-200 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-slate-900 text-white">
            <ShoppingBag size={21} strokeWidth={2.3} />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-neutral-950 sm:text-lg">
              {business.name}
            </span>
            <span className="hidden truncate text-xs text-neutral-500 sm:block">
              {business.tagline}
            </span>
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpenDropdown((value) => !value)}
            className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-2 py-1.5 transition hover:bg-neutral-50"
          >
            <div className="grid h-8 w-8 overflow-hidden rounded-md bg-neutral-100 text-neutral-500">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={17} className="m-auto" />
              )}
            </div>

            <span className="hidden max-w-28 truncate text-sm font-medium text-neutral-700 sm:block">
              {profile.name?.split(" ")[0] || "Cliente"}
            </span>
          </button>

          {openDropdown && (
            <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(false);
                  navigate("/perfil");
                }}
                className={[
                  "flex w-full items-center gap-2 px-4 py-2 text-sm transition",
                  location.pathname === "/perfil"
                    ? "bg-emerald-50 font-semibold text-emerald-800"
                    : "text-neutral-700 hover:bg-neutral-50",
                ].join(" ")}
              >
                <User size={17} /> Perfil
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
              >
                <LogOut size={17} /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
