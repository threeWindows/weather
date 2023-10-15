import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  city: z.string().min(3)
});

type FormData = z.infer<typeof schema>;

interface Props {
  onClick: (data: FormData) => void;
}

const SearchEngine = ({ onClick }: Props) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onClick(data))}>
        <header>
          <input type="text" placeholder="Searh ..." {...register("city")} />
          <input type="submit" value="." />
        </header>
      </form>
    </div>
  );
};

export default SearchEngine;
