export interface InputGroupProps {
	className?: string;
	type?: string;
	placeholder?: string;
	value: string;
	error: string | undefined;
	setValue: (str: string) => void;
}
