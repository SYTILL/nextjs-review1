import { B_INFO_URL } from "@/app/constants";

interface typeAsset {
    exchange: string;
    ticker: string;
    companyName: string;
    numberOfShares: number;
    exerciseOptionPrice?: string;
    sharePrice: number;
    currencyCode: string;
    exchangeRate: string;
    interactive: boolean;
    currentPrice: number;
}

interface typePersonInfo {
    name: string;
    country: string;
    industries: { 0: string };
    financialAssets?: typeAsset[]
    squareImage: string;
    bio: string[]
    netWorth: number;

    // id: string;
    // state: string;
    // city: string;
    // position: number;
    // thumbnail: string;
    // about: string[]
}

const getPersonInfo = async (id: string) => {
    const response = await fetch(`${B_INFO_URL}/${id}`)
    return response.json()
}

const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default async function Person({ params: { id } }: { params: { id: string } }) {
    const personInfo: typePersonInfo = await getPersonInfo(id);

    return (
        <div className="flex flex-col">
            <div className="">
                <img className="size-[300px] border-2"
                    src={personInfo.squareImage} alt={personInfo.name} />

                <div className="heading1">{personInfo.name}</div>

                <div className="heading2">{`Networth: ${Math.round(personInfo.netWorth / 1000)} Billion`}</div>

                <div className="heading2">{`Country: ${personInfo.country}`}</div>

                <div className="heading2">Industry: {personInfo.industries[0]}</div>

                <div>{personInfo.bio.join(' ')}</div>

            </div>

            {personInfo.financialAssets ?
                (<div className="mt-10">
                    <div className="heading1">Financial Assets</div>

                    <div className="grid grid-cols-4">
                        {personInfo.financialAssets.map((asset: typeAsset, index) => (
                            <div key={index} className="border-2 rounded-lg m-2 h-20 p-3">
                                <div className="boxtext">{`Ticker: ${asset.ticker}`}</div>
                                <div className="boxtext">{`Shares: $${numberWithCommas(asset.numberOfShares)}`}</div>
                                <div className="boxtext">{asset.exerciseOptionPrice ?
                                    `Exercise Price: $${asset.exerciseOptionPrice}` : ''
                                }</div>

                            </div>
                        ))}
                    </div>
                </div>)
                : null}

        </div>
    );
}
