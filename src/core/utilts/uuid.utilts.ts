const HEX_BASE = 16;

export function uuid(): string {
	let nowDate = Date.now();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
		nowDate += performance.now(); //use high-precision timer if available
	}
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (originText) {
		// Make sure the number is a positive integer(| 0) between 0 and 15(% 16). (0~9, A~F)
		const randomNum = (nowDate + Math.random() * HEX_BASE) % HEX_BASE | 0;
		nowDate = Math.floor(nowDate / HEX_BASE);
		return (originText === 'x' ? randomNum : (randomNum & 0x3) | 0x8).toString(HEX_BASE);
	});
}
