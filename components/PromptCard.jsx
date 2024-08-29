'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = (props) => {
  const { post, handleTagClick=() => {}, 
    handleEdit=() => {}, handleDelete=() => {} } = props;
  const { data: session } = useSession();
  const pathname = usePathname();
  const [copied, setCopied] = useState('')

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied('');
    }, 3000);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex items-center gap-3 cursor-pointer'>
          <Image
            src={post.creator?.image || '/assets/images/user-avatar.png'}
            alt='Creator Image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator?.email}
            </p>
          </div>

          <div className='copy_btn' onClick={handleCopy}>
            <Image
              src={copied === post.prompt
                  ? '/assets/icons/tick.svg'
                  : '/assets/icons/copy.svg'
              }
              alt='copy button'
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathname === '/profile' && (
        <div className='mt-5 flex-end gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm font-medium green_gradient cursor-pointer'
            onClick={() => handleEdit(post)}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm font-medium orange_gradient cursor-pointer'
            onClick={() => handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;
