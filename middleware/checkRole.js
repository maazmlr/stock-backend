
const roles={
  Admin:"admin",
  Real:"real",
  Demo:"Demo"
}
const checkRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user?.role; // Assuming req.user is populated via authentication middleware

    if (!userRole || !roles[userRole]?.includes(role)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    next();
  };
};

export default checkRole;
