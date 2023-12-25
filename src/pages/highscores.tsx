type HighscoreProps = {
    scores: {
        id: string;
        username: string;
        date: string;
        score: number;
    }[]
}

function Highscores({ scores }: HighscoreProps) {
    return (
        <div className="text-white">
            <h1 className="text-2xl mb-5">Highscores:</h1>
            <table className="w-full border text-sm shadow-sm">
                <thead className="bg-white/10 text-left">
                    <tr>
                        <th className="w-1/3 border border-white/10 p-2">Name</th>
                        <th className="w-1/3 border border-white/10 p-2">Date</th>
                        <th className="w-1/3 border border-white/10 p-2">Score</th>
                    </tr>
                </thead>
                <tbody className="text-left">
                    {scores?.map((item) => (
                        <tr key={item.id}>
                            <th className="border border-white/10 p-2">{item.username}</th>
                            <th className="border border-white/10 p-2">{item.date}</th>
                            <th className="border border-white/10 p-2">{item.score}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Highscores;
