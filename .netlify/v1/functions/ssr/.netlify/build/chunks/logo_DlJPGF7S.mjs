const logo = new Proxy({"src":"/_astro/logo.CU0ifLbf.png","width":240,"height":57,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/kamil/projects/thermo-vitae-astro/src/assets/logo.png";
							}
							
							return target[name];
						}
					});

export { logo as default };
