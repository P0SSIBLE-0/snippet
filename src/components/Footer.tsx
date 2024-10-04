
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Snippets. All rights reserved.
        </p>
      </div>
    </footer>
  )
}