import React, { useState, useEffect } from "react";
import EyeOpen from "../../assets/icons/eye.gif";
import EyeClose from "../../assets/icons/eye.gif";
import { signupUser, type SignupData } from "../../services/signupService";
import { fetchAllPacks, type Pack } from "../../services/packService";

interface Props {
  email: string;
  selectedPackId?: number; // ✅ pack chosen before
  onBack: () => void;
  onOtpSent: (email: string) => void;
}

const getPasswordStrength = (p: string) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[a-z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
};

const getStrengthColor = (s: number) => {
  if (s <= 1) return "bg-red-500";
  if (s === 2) return "bg-orange-500";
  if (s === 3) return "bg-yellow-400";
  if (s === 4) return "bg-blue-500";
  return "bg-green-600";
};

const SignupSecondView: React.FC<Props> = ({
  email: initialEmail,
  selectedPackId,
  onBack,
  onOtpSent,
}) => {
  const [email, setEmail] = useState(initialEmail); // ✅ editable email
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [packId, setPackId] = useState<number | null>(
    selectedPackId ?? null // ✅ preselected pack
  );
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const isValid =
    email.trim() &&
    fullName.trim() &&
    password.trim() &&
    strength >= 3 &&
    uniqueId.trim() &&
    packId !== null;

  useEffect(() => {
    setLoading(true);
    fetchAllPacks()
      .then(setPacks)
      .catch(console.error)
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
      onOtpSent(email);
    } catch (error: any) {
      alert("Erreur d'inscription : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl my-8">
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT */}
            <div className="p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Créer un compte Professeur
              </h2>

              <div className="space-y-6">
                {/* ✅ EMAIL ENABLED */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* FULL NAME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3.5 pr-12 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <img
                        src={showPassword ? EyeClose : EyeOpen}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>

                  {password && (
                    <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                      <div
                        className={`h-full rounded-full ${getStrengthColor(
                          strength
                        )}`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* UNIQUE ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Identifiant unique *
                  </label>
                  <input
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3.5 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* RIGHT - PACKS */}
            <div className="bg-gray-50 p-8 lg:p-10 border-l">
              <h3 className="text-2xl font-bold mb-4">Choisir un pack</h3>

              <div className="space-y-4">
                {packs.map((pack) => (
                  <div
                    key={pack.id}
                    onClick={() => setPackId(pack.id)}
                    className={`border rounded-xl p-5 cursor-pointer transition-all ${
                      packId === pack.id
                        ? "border-blue-500 ring-2 ring-blue-100 shadow-md"
                        : "border-gray-300 hover:shadow"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-bold">{pack.type}</div>
                        <p className="text-sm text-gray-600">
                          {pack.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          {pack.new_price} DH
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between p-6 border-t">
            <button type="button" onClick={onBack}>
              ← Retour
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-300"
            >
              S'inscrire →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupSecondView;
