
export const useLoading = () => {
	const use_loading = useState<boolean>("use_loading", () => false)
	return use_loading;
};
