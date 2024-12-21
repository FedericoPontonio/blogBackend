-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_id_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
