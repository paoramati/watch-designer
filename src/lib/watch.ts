export type CaseConfig = {
	shape: 'round' | 'square' | 'barrel';
	size: 'sm' | 'md' | 'lg';
	color: string;
};

export type DialConfig = {
	color: string;
	markers: 'indices' | 'arabic' | 'roman' | 'dots' | 'none';
	hands: 'sword' | 'dauphine' | 'baton';
	handsColor: string;
};

export type StrapConfig = {
	style: 'leather' | 'rubber' | 'nato' | 'bracelet';
	color: string;
};

export type WatchConfig = {
	case: CaseConfig;
	dial: DialConfig;
	strap: StrapConfig;
};

export const sizeToRadius: Record<CaseConfig['size'], number> = {
	sm: 65,
	md: 85,
	lg: 105
};

export const caseColors = [
	{ label: 'Silver', value: '#C0C0C0' },
	{ label: 'Gold', value: '#D4AF37' },
	{ label: 'Black', value: '#222222' },
	{ label: 'Rose Gold', value: '#B76E79' },
	{ label: 'Gunmetal', value: '#4A4A5A' },
	{ label: 'Bronze', value: '#8C6D4F' }
];

export const dialColors = [
	{ label: 'White', value: '#F5F5F5' },
	{ label: 'Black', value: '#111111' },
	{ label: 'Cream', value: '#F0EAD6' },
	{ label: 'Navy', value: '#1B2A4A' },
	{ label: 'Slate', value: '#4A5568' },
	{ label: 'Champagne', value: '#F7E7CE' }
];

export const strapColors = [
	{ label: 'Brown', value: '#4A2C0A' },
	{ label: 'Black', value: '#1a1a1a' },
	{ label: 'Navy', value: '#1B2A4A' },
	{ label: 'Tan', value: '#C19A6B' },
	{ label: 'Green', value: '#2D4A3E' },
	{ label: 'Burgundy', value: '#6B2737' }
];

export const defaultConfig: WatchConfig = {
	case: { shape: 'round', size: 'md', color: '#C0C0C0' },
	dial: { color: '#F5F5F5', markers: 'indices', hands: 'sword', handsColor: '#1a1a1a' },
	strap: { style: 'leather', color: '#4A2C0A' }
};

export function applyAiToCase(config: WatchConfig, description: string): void {
	const d = description.toLowerCase();
	if (d.includes('rose gold')) config.case.color = '#B76E79';
	else if (d.includes('gold')) config.case.color = '#D4AF37';
	else if (d.includes('silver') || d.includes('steel')) config.case.color = '#C0C0C0';
	else if (d.includes('black')) config.case.color = '#222222';
	else if (d.includes('gunmetal')) config.case.color = '#4A4A5A';
	else if (d.includes('bronze')) config.case.color = '#8C6D4F';
	if (d.includes('square')) config.case.shape = 'square';
	else if (d.includes('barrel') || d.includes('cushion') || d.includes('tonneau'))
		config.case.shape = 'barrel';
	else if (d.includes('round') || d.includes('circle')) config.case.shape = 'round';
	if (d.includes('small') || d.includes(' sm ')) config.case.size = 'sm';
	else if (d.includes('large') || d.includes('big')) config.case.size = 'lg';
	else if (d.includes('medium')) config.case.size = 'md';
}

export function applyAiToDial(config: WatchConfig, description: string): void {
	const d = description.toLowerCase();
	if (d.includes('black')) config.dial.color = '#111111';
	else if (d.includes('white')) config.dial.color = '#F5F5F5';
	else if (d.includes('cream') || d.includes('ivory')) config.dial.color = '#F0EAD6';
	else if (d.includes('navy') || d.includes('blue')) config.dial.color = '#1B2A4A';
	else if (d.includes('champagne')) config.dial.color = '#F7E7CE';
	if (d.includes('roman')) config.dial.markers = 'roman';
	else if (d.includes('arabic') || d.includes('number')) config.dial.markers = 'arabic';
	else if (d.includes('dot')) config.dial.markers = 'dots';
	else if (d.includes('clean') || d.includes('minimalist') || d.includes('bare'))
		config.dial.markers = 'none';
	else if (d.includes('index') || d.includes('stick') || d.includes('line'))
		config.dial.markers = 'indices';
	if (d.includes('dauphine') || d.includes('leaf')) config.dial.hands = 'dauphine';
	else if (d.includes('baton') || d.includes('stick') || d.includes('slim'))
		config.dial.hands = 'baton';
	else if (d.includes('sword') || d.includes('classic')) config.dial.hands = 'sword';
	if (d.includes('gold hand') || d.includes('gold pointer')) config.dial.handsColor = '#D4AF37';
	else if (d.includes('white hand') || d.includes('white pointer'))
		config.dial.handsColor = '#F5F5F5';
	else if (d.includes('silver hand')) config.dial.handsColor = '#C0C0C0';
}

export function applyAiToStrap(config: WatchConfig, description: string): void {
	const d = description.toLowerCase();
	if (d.includes('rubber') || d.includes('sport') || d.includes('silicon'))
		config.strap.style = 'rubber';
	else if (d.includes('nato') || d.includes('nylon')) config.strap.style = 'nato';
	else if (d.includes('bracelet') || d.includes('metal') || d.includes('link'))
		config.strap.style = 'bracelet';
	else if (d.includes('leather')) config.strap.style = 'leather';
	if (d.includes('black')) config.strap.color = '#1a1a1a';
	else if (d.includes('brown') || d.includes('tan') || d.includes('cognac'))
		config.strap.color = '#4A2C0A';
	else if (d.includes('navy') || d.includes('blue')) config.strap.color = '#1B2A4A';
	else if (d.includes('green')) config.strap.color = '#2D4A3E';
	else if (d.includes('burgundy') || d.includes('red')) config.strap.color = '#6B2737';
}
