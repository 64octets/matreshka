import defs from './_core/defs';
import dom from './_dom';
import selectNodes from './_bindings/selectnodes';
import toArray from './_util/toarray';
import checkObjectType from './_util/checkobjecttype';

const customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/;

export default function select(object, selector) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        selector = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'selectAll');
    }

	if (customSelectorTestReg.test(selector)) {
		return selectNodes(object, selector)[0] || null;
	} else {
        const def = defs.get(object);

        if (!def || typeof selector !== 'string') {
            return null;
        }

        const propDef = def.props.sandbox;

        if (!propDef) {
            return null;
        }

        const { bindings } = propDef;

        if(bindings) {
            const { node } = bindings[0];
            return node.querySelector(selector);
        }

        return null;
	}
};