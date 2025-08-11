import { Button } from "antd";
import Card from "antd/es/card/Card";

const UpcomingMatchesCard = ({ match }) => {
  const formatDateTime = (gmtString) => {
    const date = new Date(gmtString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata"
    });
  };
  return (
    <Card
      key={match.id}
      className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-white rounded-xl"
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-bold team-names">
            {match.teamA} vs {match.teamB}
          </div>
          <div className="text-sm text-gray-300">{match.series}</div>
          <div className="text-xs text-gray-400">
            {formatDateTime(match.dateTimeGMT)}
          </div>
        </div>
        <Button
          type="default"
          className="rounded-full bg-pBlue border-none text-white set-reminder-btn"
        >
          Set Reminder
        </Button>
      </div>
    </Card>
  );
};

export default UpcomingMatchesCard;
