if exists( select name from sys.procedures where name = 'insPerson')
begin
	drop proc insPerson
end
go

create proc insPerson
		@first_name varchar(255),
		@last_name varchar(255), 
		@middle_name varchar(255), 
		@username varchar(255), 
		@password varbinary(max)
as 
	if exists(select * from person where username = @username)
	begin 
		return -1
	end 

	insert into person(
		first_name,
		last_name,
		middle_name,
		username,
		password,
		created
	) 
	values (
		@first_name,
		@last_name,
		@middle_name,
		@username,
		@password,
		getdate()
	) 
	return 0
go