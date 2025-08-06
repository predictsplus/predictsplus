import { Button } from "antd";
import Card from "antd/es/card/Card";

const UpcomingMatchesCard = ({ match }) => {
    return (
        <Card key={match.id} className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-white rounded-xl">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <div className="font-bold text-lg">{match.teamA} vs {match.teamB}</div>
                    <div className="text-sm text-gray-400">{match.time}</div>
                </div>
                <Button type="default" className="rounded-full bg-pBlue border-none text-white">
                    Set Reminder
                </Button>
            </div>
        </Card>
    )
}

export default UpcomingMatchesCard