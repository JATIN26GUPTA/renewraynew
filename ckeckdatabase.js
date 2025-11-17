import { supabase } from "./supabase";

useEffect(() => {
  async function test() {
    const { data, error } = await supabase
      .from("YOUR_TABLE")
      .select("*")
      .limit(1);
    console.log("Supabase Test:", { data, error });
  }
  test();
}, []);
