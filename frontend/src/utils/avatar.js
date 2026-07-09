export function getDeterministicAvatar(name = "User") {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-purple-500 to-pink-500",
    "from-blue-500 to-indigo-600",
    "from-rose-400 to-orange-400"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return { initials, gradientClass: gradients[index] };
}