"use client"

import { useRouter } from "next/navigation";

interface typeB {
    id: string;
    name: string;
    squareImage: string;
    netWorth: number;
    industries: { 0: string };
}


export default async function PersonBox({ id, name, squareImage, netWorth, industries }: typeB) {

    const router = useRouter();
    const onClick = () => {
        router.push(`/person/${id}`)
    }

    return (
        <div key={id} className="w-[180px] h-[220px] mb-4" onClick={onClick}>
            <img className="w-[180px] h-[180px] border-2"
                src={squareImage} alt={name} />

            <div className="text-sm ml-1 mt-1 font-semibold">
                {name}</div>

            <div className="text-xs ml-1">
                {`${ Math.round(netWorth / 1000) } Billion / ${ industries[0]}`}
            </div>
        </div>
    );
}
