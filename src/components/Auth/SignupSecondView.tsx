import React, { useState, useEffect } from "react";
import EyeOpen from "../../assets/icons/eye.gif";
import EyeClose from "../../assets/icons/eye.gif";
import { signupUser, type SignupData } from "../../services/signupService";
import { fetchAllPacks, type Pack } from "../../services/packService";
import SignupThirdView from "./SignupThirdView";

interface Props {
  email: string;
  onBack: () => void;
}

const getPasswordStrength = (password: string) => {
  let s = 0;
  if (password.length >= 8) s++;
  if (/[A-Z]/.test(password)) s++;
  if (/[a-z]/.test(password)) s++;
  if (/[0-9]/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  return s;
};

const getStrengthColor = (s: number) => {
  if (s <= 1) return "bg-red-500";
  if (s === 2) return "bg-orange-500";
  if (s === 3) return "bg-yellow-400";
  if (s === 4) return "bg-blue-500";
  return "bg-green-600";
};

const SignupSecondView: React.FC<Props> = ({ email, onBack }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [packId, setPackId] = useState<number | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const strength = getPasswordStrength(password);
  const isValid =
    fullName.trim() &&
    password.trim() &&
    strength >= 3 &&
    uniqueId.trim() &&
    packId !== null;

  useEffect(() => {
    setLoading(true);
    fetchAllPacks()
      .then((data) => setPacks(data))
      .catch((err) => console.error("Error fetching packs:", err))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    const data: SignupData = {
      email,
      fullName: fullName.trim(),
      password,
      role: "PROFESSEUR",
      uniquePath: uniqueId.trim(),
      packId: packId!,
    };

    try {
      await signupUser(data);
      setSignupSuccess(true);
    } catch (error: any) {
      alert("Erreur d'inscription : " + error.message);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show third view after successful signup
  if (signupSuccess) {
    return <SignupThirdView email={email} onBack={onBack} />;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl my-8">
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Créer un compte Professeur
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="w-full border border-gray-300 rounded-lg px-4 py-3.5 bg-gray-50 text-gray-700">
                    {email}
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom complet"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Créez un mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <img
                        src={showPassword ? EyeClose : EyeOpen}
                        alt={showPassword ? "Hide password" : "Show password"}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>

                  {password && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Force du mot de passe:</span>
                        <span
                          className={`font-medium ${
                            strength <= 2
                              ? "text-red-600"
                              : strength === 3
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {strength <= 2 ? "Faible" : strength === 3 ? "Moyen" : "Fort"}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${getStrengthColor(
                            strength
                          )}`}
                          style={{ width: `${(strength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Unique ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Identifiant unique *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre identifiant unique"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Cet identifiant sera utilisé pour votre lien de partage.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Pack Selection */}
            <div className="bg-gray-50 p-8 lg:p-10 border-l border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Choisir un pack</h3>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {packs.map((pack) => (
                    <div
                      key={pack.id}
                      className={`border rounded-xl p-5 cursor-pointer transition-all ${
                        packId === pack.id
                          ? "border-blue-500 bg-white ring-2 ring-blue-100 shadow-md"
                          : "border-gray-300 bg-white hover:border-gray-400 hover:shadow"
                      }`}
                      onClick={() => setPackId(pack.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">{pack.type}</span>
                            {pack.old_price && pack.new_price && (
                              <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                                Économisez {pack.old_price - pack.new_price} DH
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{pack.description}</p>
                          <div className="text-sm text-gray-500">Playlists incluses: {pack.count_playlst}</div>
                        </div>
                        <div className="text-right ml-4">
                          {pack.old_price && <div className="text-lg line-through text-gray-400 mb-1">{pack.old_price} DH</div>}
                          <div className="text-2xl font-bold text-blue-600">{pack.new_price} DH</div>
                          {pack.old_price && pack.new_price && <div className="text-sm text-gray-500 mt-1">par mois</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 lg:p-8 border-t border-gray-200 bg-white">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
              disabled={loading}
            >
              ← Retour
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all min-w-[140px] ${
                !isValid || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? "Chargement..." : "S'inscrire →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupSecondView;
