const infoBlockOptions: any = {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
}


export const chartInfoComponentDate = (timestamp: number): string => {

	const date = new Date(timestamp)

	return date.toLocaleDateString("en-US", infoBlockOptions);


}


export const chartDate = (timestamp: number): string => {

	const date = new Date(timestamp)

	return date.toLocaleDateString("ru")

}