if exists( select name from sys.procedures where name = 'getPerson')
begin
	drop proc getPerson
end
go

create proc getPerson
		@id int
as 
	set nocount on;
 	select	first_name,
			last_name,
			middle_name,
			username,
			[password]
	from person
	where id = @id 
	return 0
go