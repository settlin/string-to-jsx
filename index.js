import React from 'react';
import {transform} from '@babel/core';
import {renderToString} from 'react-dom/server';
import '@babel/preset-react';
// import '@babel/plugin-transform-react-jsx';
// import {parse} from '@babel/parser';
// import traverse from '@babel/traverse';
// import generate from '@babel/generator';
// import t from '@babel/types';

// const knownIdentifiers = [
// 	'React', 'createElement',
// 	'style', 'href', 'textDecoration', 'fontSize',
// ];

const replaceVars = function(code) {
	return code;

	// // parse the code -> ast
	// const ast = parse(code);

	// // transform the ast
	// traverse(ast, {
	// 	enter(path) {
	// 		// if (path.node.type === 'Identifier') console.log(path.node.name, 'id', t.isIdentifier(path.node), 'jsx', t.isJSXIdentifier(path.node), 'node', t.jsxIdentifier(path.node.name));
	// 		if (path.node.type === 'Identifier' && !knownIdentifiers.includes(path.node.name)) {
	// 			Logger.debug('Replacing', path.node.name);
	// 			path.node.name = 'data.' + path.node.name;
	// 		}
	// 	},
	// });

	// // generate code <- ast
	// const output = generate(ast, code);
	// return output.code;
};

export const getCodeFromTemplate = function(template) {
	const {code} = transform(template, {
		presets: ['@babel/preset-react'],
		// plugins: ['@babel/plugin-transform-react-jsx'],
	});
	// we do not use (data) before replaceVars as it too will be replaced;
	return '(props) => ' + replaceVars(code);
};

export const render = function({template, params}) {
	const c = new Function('React', `return ${getCodeFromTemplate(template)}`)(React); // eslint-disable-line no-new-func
	return renderToString(c(params));
};
