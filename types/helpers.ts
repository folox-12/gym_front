export interface NetworkData<DataType = unknown> {
    loading: boolean;
    error: string | null;
    data: DataType | null;
}
