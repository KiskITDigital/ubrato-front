export const allowedNotEmailVerifiedRoutes = [
  "notifications",
  "help",
  "documents",
];

export const allowedNotUserVerifiedRoutes = [
  ...allowedNotEmailVerifiedRoutes,
  "settings",
];
