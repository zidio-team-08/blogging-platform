import { faker } from '@faker-js/faker';
import userMode from '../model/user.model.js';
import blogModel from '../model/blog.model.js';

// Predefined tags for more realistic blog categorization
const blogTags = [
    'Technology', 'Programming', 'Web Development', 'Health', 'Fitness',
    'Food', 'Cooking', 'Travel', 'Adventure', 'Education', 'Science',
    'AI', 'Machine Learning', 'Data Science', 'Blockchain', 'Crypto',
    'Personal Finance', 'Investing', 'Productivity', 'Self Improvement',
    'Books', 'Reading', 'Writing', 'Art', 'Design', 'Photography',
    'Music', 'Movies', 'Gaming', 'Sports', 'Mindfulness', 'Mental Health'
];

// Generate rich blog content with paragraphs, headings, and base64 images
const generateRichContent = () => {
    // Create 3-6 paragraphs
    const paragraphCount = faker.number.int({ min: 3, max: 6 });
    let content = '';

    // Add intro paragraph
    content += `<p>${faker.lorem.paragraph(faker.number.int({ min: 5, max: 10 }))}</p>\n\n`;

    // Add a heading
    content += `<h2>${faker.lorem.sentence(faker.number.int({ min: 3, max: 8 }))}</h2>\n\n`;

    // Add a placeholder for a base64 image (simulated)
    const imageWidth = faker.number.int({ min: 600, max: 1200 });
    const imageHeight = faker.number.int({ min: 400, max: 800 });
    content += `<img src="data:image/svg+xml;base64,${Buffer.from(`<svg width="${imageWidth}" height="${imageHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#${faker.color.rgb({ format: 'hex', prefix: '' })}"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="#fff" text-anchor="middle">${faker.lorem.words(2)}</text></svg>`).toString('base64')}" alt="${faker.lorem.words(3)}" />\n\n`;

    // Add more paragraphs with occasional headings
    for (let i = 0; i < paragraphCount; i++) {
        // 30% chance to add a heading before paragraph
        if (faker.number.int(10) < 3) {
            content += `<h3>${faker.lorem.sentence(faker.number.int({ min: 3, max: 6 }))}</h3>\n\n`;
        }

        content += `<p>${faker.lorem.paragraph(faker.number.int({ min: 3, max: 8 }))}</p>\n\n`;

        // 20% chance to add a code block
        if (faker.number.int(10) < 2) {
            const codeLanguages = ['javascript', 'python', 'html', 'css', 'java'];
            const language = faker.helpers.arrayElement(codeLanguages);
            content += `\`\`\`${language}\n${faker.lorem.lines(faker.number.int({ min: 3, max: 8 }))}\n\`\`\`\n\n`;
        }
    }

    // Add conclusion
    content += `<p>${faker.lorem.paragraph(faker.number.int({ min: 4, max: 7 }))}</p>`;

    return content;
};

export const createUser = async (num) => {

    const users = [];

    for (let i = 0; i < num; i++) {
        users.push(userMode.create({
            name: faker.name.fullName(),
            email: faker.internet.email(),
            username: `@${faker.internet.userName().toLowerCase()}`,
            password: '123456',
            profileImage: {
                url: faker.image.avatar(),
                public_id: faker.string.uuid(),
            }
        }));
    }

    await Promise.all(users);
    console.log('Users created successfully');
    process.exit(0)
}

// create blogs 
export const createBlog = async (num) => {

    try {

        const blogs = [];

        // get all users ObjectId
        const users = await userMode.find().select('_id').lean().limit(100);

        users.forEach(user => {
            for (let i = 0; i < num; i++) {
                blogs.push(blogModel.create({
                    title: faker.lorem.sentence(20),
                    content: generateRichContent(),
                    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) },
                        () => faker.helpers.arrayElement(blogTags)),
                    author: user,
                    bannerImage: {
                        url: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
                        public_id: faker.string.uuid(),
                    }
                }));
            }
        });

        await Promise.all(blogs);
        console.log('Blogs created successfully');
        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

