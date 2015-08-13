//noinspection BadExpressionStatementJS
module.exports = {
	block: 'page',
	title: 'Суммарная популяция',
	styles: [
			{ elem: 'css', url: 'task2.css' }
	],
	scripts: [
			{ elem: 'js', url: 'task2.js' }
	],
	content: [
		{
			block: 'header',
			content: [
				{
					elem: 'title',
					tag: 'h1',
					content: 'Суммарная популяция'
				},
				{
					elem: 'description',
					tag: 'p',
					content: 'Тестовое задание №2 для поступления в Школу разработчкив интерфейсов в Москве.'
				},
				{
					block: 'banner',
					mods: { 'github': true }
				}
			]
		},
		{
			block: 'content',
			content: [
				{
					block: 'console',
					content: [
						{
							elem: 'text',
							content: "Откройте консоль, чтобы увидеть результат работы."
						},
						{
							block: 'button',
							mix: [ { block: 'console', elem: 'button' } ],
							mods : { theme : 'islands', size : 'm', view: 'action' },
							text: 'Рассчитать популяцию!',
							attrs: { onclick: 'getPopulations()' }
						}
					]
				},
				{
					block: 'documentation',
					tag: 'iframe',
					attrs: {
						src: '/common.blocks/documentation/__shri/global.html'
					}
				}
			]
		}
	]
};