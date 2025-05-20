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
    const paragraphs = faker.number.int({ min: 3, max: 5 });
    let content = '';

    for (let i = 0; i < paragraphs; i++) {
        content += `<p>${faker.lorem.paragraphs(1)}</p>`;
        if (i % 2 === 0) {
            content += `<h2>${faker.lorem.sentence(3)}</h2>`;
        }
    }

    return content;
}

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

