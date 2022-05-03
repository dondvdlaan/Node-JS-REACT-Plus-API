export interface Stock{
    name: string,
    ticker: string,
    trend: number[]
}

export interface portfolioStock extends Stock{
    buyingDate: string,
    quantity:number,
    id:string
}