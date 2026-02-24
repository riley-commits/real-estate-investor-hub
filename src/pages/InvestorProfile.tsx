import { getUser } from "@/lib/auth";

const InvestorProfile = () => {
  const user = getUser();
  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-4">My Profile</h1>
      {user ? (
        <div className="space-y-2 text-sm text-foreground">
          <div>
            <span className="font-medium">Username:</span> {user.username}
          </div>
          <div>
            <span className="font-medium">Role:</span> {user.role}</div>
          <div>
            <span className="font-medium">Member since:</span> {new Date(user.at).toLocaleDateString()}</div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Unable to load profile.</p>
      )}
    </div>
  );
};

export default InvestorProfile;
