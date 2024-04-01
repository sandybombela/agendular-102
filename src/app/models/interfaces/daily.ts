export interface IDaily {
    id: number,
    note: string,
    emotion: string,
    color: string,
    timestamp: number
}

export interface INewDaily extends Omit<IDaily, 'id' | 'timestamp'> { }
