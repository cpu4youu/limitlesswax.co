export interface Transaction {
    max_net_usage_words: number;
    max_cpu_usage_ms: number;
    actions: Action[];
}

export interface Action {
    account: string;
    name: string;
    authorization: any;
    data: any;
}
