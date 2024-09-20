import { ALL_B_LIST_URL } from "./constants";
import PersonBox from "./PersonBox";


interface typeB {
    id: string;
    name: string;
    squareImage: string;
    netWorth: number;
    industries: { 0: string };
}

const getBs = async () => {
    const response = await fetch(ALL_B_LIST_URL)
    return response.json()
}

export default async function Home() {
    const BsList = await getBs()

    return (
        <div className="grid grid-cols-4 gap-6">
            {BsList.map((B: typeB) => (
                <PersonBox
                    key={B.id}
                    id={B.id}
                    name={B.name}
                    squareImage={B.squareImage}
                    netWorth={B.netWorth}
                    industries={B.industries}
                />
            ))}
        </div>
    );
}
