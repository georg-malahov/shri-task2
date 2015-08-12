//noinspection BadExpressionStatementJS
module.exports = {
	block: 'page',
	title: 'Онлайн-табло авиарейсов',
	styles: [
			{ elem: 'css', url: 'task2.css' }
	],
	scripts: [
			{ elem: 'js', url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js' },
			{ elem: 'js', url: 'task2.js' }
	],
	content: [
		{
			block: 'header',
			content: [
				{
					elem: 'title',
					tag: 'h1',
					content: 'Суммарная популяция в Африке'
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
					content: "Здесь будет отображаться вывод консоли!"
				}
			]
		}
	]
};