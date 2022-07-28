import config from "@config/config.json";
import { dateFormat } from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ post }) => {
  const { summary_length } = config.settings;
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
      {post.map((post, i) => (
        <div key={`key-${i}`} className={i === 0 ? "sm:col-span-2" : undefined}>
          {post.frontmatter.image && (
            <Image
              className="rounded-lg"
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              width={i === 0 ? "925" : "445"}
              height={i === 0 ? "475" : "230"}
              layout="responsive"
            />
          )}
          <ul className="mt-4 text-text">
            <li className="mb-2 mr-4 inline-block">
              {post.frontmatter.author.map((author, i) => (
                <Link href={`/author/${slugify(author)}`} key={`author-${i}`}>
                  <a className="inline-block hover:text-primary">
                    <span className="mr-2 align-top">
                      <Image
                        src="/images/authors/linda.jpg"
                        alt={post.frontmatter.author}
                        height={25}
                        width={25}
                        className="h-6 w-6 rounded-full"
                      />
                    </span>
                    <span>{post.frontmatter.author}</span>
                  </a>
                </Link>
              ))}
            </li>
            <li className="mb-2 mr-4 inline-block">
              {dateFormat(new Date(post.frontmatter.date))}
            </li>
            <li className="mb-2 mr-4 inline-block">
              <ul>
                {post.frontmatter.categories.map((category, i) => (
                  <li className="inline-block" key={`category-${i}`}>
                    <Link href={`/categories/${slugify(category)}`}>
                      <a className="mr-3 hover:text-primary">
                        &#9635; {humanize(category)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <h3 className="mb-2">
            <Link href={`/posts/${post.slug}`} passHref>
              <a className="block hover:text-primary">
                {post.frontmatter.title}
              </a>
            </Link>
          </h3>
          <p className="text-text">
            {post.content.slice(0, Number(summary_length))}...
          </p>
        </div>
      ))}
    </div>
  );
};

export default Posts;