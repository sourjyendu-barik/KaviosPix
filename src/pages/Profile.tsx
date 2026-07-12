import {
  MapPin,
  Calendar,
  Mail,
  Award,
  Activity,
  Image as ImageIcon,
  Layers,
  Heart,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useUserContext } from "../context/AuthProvider";

export default function ProfilePage() {
  const { user, logout } = useUserContext();
  const profile = {
    name: user?.name,
    email: user?.email,
    location: "New York, USA",
    joinedDate: "January 2024",
    avatarUrl: user?.profilePicture,
    bio: "Landscape photographer and travel enthusiast. Passionate about capturing nature and creating beautiful visual stories.",
    hobbies: ["Photography", "Travel", "Hiking", "Cycling"],

    totalPhotos: 120,
    totalAlbums: 10,
    sharedPhotos: 48,
    sharedAlbums: 4,

    albums: [
      {
        id: 1,
        title: "Nature Collection",
        photoCount: 32,
        isShared: true,
        coverUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=80",
      },
      {
        id: 2,
        title: "City Lights",
        photoCount: 18,
        isShared: false,
        coverUrl:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&q=80",
      },
      {
        id: 3,
        title: "Mountains",
        photoCount: 45,
        isShared: true,
        coverUrl:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=80",
      },
      {
        id: 4,
        title: "Beach Days",
        photoCount: 25,
        isShared: false,
        coverUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80",
      },
    ],
  };

  return (
    <div className="space-y-10 py-2">
      {/* Hero */}
      <div className="relative h-60 overflow-hidden rounded-3xl bg-neutral-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <button
          onClick={() => logout()}
          className="absolute top-6 right-6 flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
        <div className="absolute bottom-8 left-8 flex items-end gap-5">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-28 h-28 rounded-2xl object-cover border-4 border-white"
          />

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">{profile.name}</h1>

              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Award size={12} />
                Curated Creator
              </span>
            </div>

            <p className="text-neutral-300">{profile.email}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-3xl border p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-2xl p-4 flex gap-3">
                <MapPin className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold">{profile.location}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex gap-3">
                <Mail className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold">{profile.email}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex gap-3">
                <Calendar className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="font-semibold">{profile.joinedDate}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex gap-3">
                <Award className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="font-semibold">Workspace Admin</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">Biography</h3>
              <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3">Hobbies</h3>

              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <Heart size={12} className="text-blue-600 fill-blue-600" />
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl border p-8">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-blue-600" />
              <h2 className="font-bold text-lg">Creative Metrics</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <ImageIcon className="mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-black">{profile.totalPhotos}</p>
                <p className="text-xs text-gray-500">Photos</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <Layers className="mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-black">{profile.totalAlbums}</p>
                <p className="text-xs text-gray-500">Albums</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <Sparkles className="mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-black">{profile.sharedPhotos}</p>
                <p className="text-xs text-gray-500">Shared</p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-2xl p-4">
              <p className="text-sm text-gray-600">
                You are collaborating in <strong>{profile.sharedAlbums}</strong>{" "}
                shared albums with <strong>{profile.sharedPhotos}</strong>{" "}
                shared photos.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border p-8">
            <h2 className="font-bold text-lg mb-5">Portfolio Directory</h2>

            <div className="space-y-3">
              {profile.albums.map((album) => (
                <div
                  key={album.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
                >
                  <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{album.title}</p>
                    <p className="text-xs text-gray-500">
                      {album.photoCount} photos
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      album.isShared
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {album.isShared ? "Shared" : "Private"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
