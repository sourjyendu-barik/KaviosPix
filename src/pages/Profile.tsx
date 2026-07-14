import {
  MapPin,
  Calendar,
  Mail,
  Award,
  Heart,
  LogOut,
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { useUserContext } from "../context/AuthProvider";
import { useState } from "react";
import UserDetailsModal from "../components/UserDetailsModal";
import { deleteUserDetails } from "../api";
import { type UserDetails } from "../Types/types";

export default function ProfilePage() {
  const { user, logout, userDetails, setUserDetails } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<
    UserDetails | undefined
  >();
  const handleAddDetails = async () => {
    setSelectedDetails(undefined);
    setShowModal(true);
  };

  const handleUpdateDetails = async () => {
    if (!userDetails) return;
    setSelectedDetails(userDetails);
    setShowModal(true);
  };

  const handleDeleteDetails = async () => {
    if (!userDetails?._id) return;
    await deleteUserDetails();
    setUserDetails(null);
  };
  return (
    // change the outer wrapper
    <div className="min-h-screen bg-white py-2">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Profile Card */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800/60 shadow-xl shadow-black/40 text-white p-6 sm:p-8">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              {user?.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={user?.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover"
                />
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-neutral-900" />
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <h1 className="text-lg sm:text-xl font-bold">{user?.name}</h1>
            </div>
            <p className="text-neutral-400 text-sm break-all">{user?.email}</p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-3 w-full sm:w-auto">
              <button
                onClick={() => logout()}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
        {/* Details Card */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-5 sm:p-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-lg text-white">User Details</h2>

            <div className="flex items-center gap-2">
              {!userDetails ? (
                <button
                  onClick={handleAddDetails}
                  title="Add details"
                  className="flex items-center gap-1 rounded-xl bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-700"
                >
                  <PlusCircle size={16} />
                  Add
                </button>
              ) : (
                <>
                  <button
                    onClick={handleUpdateDetails}
                    title="Update details"
                    className="flex items-center gap-1 rounded-xl bg-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-700"
                  >
                    <Pencil size={16} />
                    Update
                  </button>

                  <button
                    onClick={handleDeleteDetails}
                    title="Delete details"
                    className="flex items-center gap-1 rounded-xl bg-red-950/50 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-950"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {!userDetails ? (
            <p className="text-sm text-neutral-500">
              No details added yet. Click "Add" to create your profile details.
            </p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-neutral-800/60 rounded-xl p-4 flex gap-3 min-w-0">
                  <MapPin className="text-purple-400 shrink-0" size={20} />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-neutral-500">
                      Location
                    </p>
                    <p className="font-semibold text-white truncate">
                      {userDetails.location || "—"}
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-800/60 rounded-xl p-4 flex gap-3 min-w-0">
                  <Mail className="text-purple-400 shrink-0" size={20} />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-neutral-500">
                      Email
                    </p>
                    <p className="font-semibold text-white truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-800/60 rounded-xl p-4 flex gap-3 min-w-0">
                  <Calendar className="text-purple-400 shrink-0" size={20} />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-neutral-500">
                      Member Since
                    </p>
                    <p className="font-semibold text-white truncate">
                      {"date"}
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-800/60 rounded-xl p-4 flex gap-3 min-w-0">
                  <Award className="text-purple-400 shrink-0" size={20} />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-neutral-500">
                      Role
                    </p>
                    <p className="font-semibold text-white truncate">
                      {userDetails.role || "user"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-2">About</h3>
                <p className="text-neutral-400 text-sm leading-relaxed break-words">
                  {userDetails.about || "No details added yet."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-3">Hobbies</h3>

                <div className="flex flex-wrap gap-2">
                  {userDetails.hobbies?.length ? (
                    userDetails.hobbies.map((hobby: string) => (
                      <span
                        key={hobby}
                        className="bg-neutral-800 text-neutral-200 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5"
                      >
                        <Heart
                          size={12}
                          className="text-purple-400 fill-purple-400"
                        />
                        {hobby}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500">
                      No hobbies added.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <UserDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={selectedDetails}
        onSuccess={(details) => {
          setUserDetails(details);
          setShowModal(false);
        }}
      />
    </div>
  );
}
