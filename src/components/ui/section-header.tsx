// Interface use to define the structure of an object in typescript

interface SectionHeaderProps {
  title: string;
  subTitle: string;
}

const SectionHeader = ({ title, subTitle }: SectionHeaderProps) => {
  return (
    <div className="mx-auto max-w-2xl text-center py-8">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg px-6">
        {subTitle}
      </p>
    </div>
  );
};

export default SectionHeader;
