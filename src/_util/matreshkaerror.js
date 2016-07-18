const bindingErrorPrefix = 'Binding error:';
const errors = {
	'binding:node_missing': ({key, node}) => {
		const selectorInfo = typeof node === 'string' ? ` The selector is ${node}` : '';
		return `${bindingErrorPrefix} node is missing for ${key}.${selectorInfo}`
	},
	'binding:falsy_key': () => 'Binding error: "key" arg cannot be falsy'
}

export default function MatreshkaError(key, data) {
	const getError = errors[key];
	if(!getError) {
		throw Error(`Unknown error "${key}"`);
	}

	return new Error(errors[key](data));
}
